using System.Collections.Generic;
using System.Linq;
using AutoMapper;

using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile : Profile {
        public MappingProfile() {
            // Domain to API Resource
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, FeatureResource>();
            CreateMap<Contact, ContactResource>();
            CreateMap<Vehicle, VehicleResource>()
                .ForMember(vr => vr.Features, opt => opt.MapFrom(
                    v => v.Features.Select(vf => vf.FeatureId)
                ));

            // API Resource to Domain            
            CreateMap<ContactResource, Contact>();
            CreateMap<VehicleResource, Vehicle>()
                .ForMember(v => v.Features, opt => opt.Ignore())
                .ForMember(v => v.Id, opt => opt.Ignore())
                .AfterMap((vr, v) => {
                    // Remove unselected features
                    var removeFeatures = new List<VehicleFeature>();
                    foreach (var f in v.Features)
                        if(!vr.Features.Contains(f.FeatureId))
                            removeFeatures.Add(f);
                    foreach (var f in removeFeatures)
                        v.Features.Remove(f);

                    // Add new features
                    foreach (var id in vr.Features)
                        if(!v.Features.Any(f => f.FeatureId == id))
                            v.Features.Add(new VehicleFeature { 
                                FeatureId = id 
                            });
                });
        }
    }
}