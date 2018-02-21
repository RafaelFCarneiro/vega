using System.Collections.Generic;
using System.Linq;
using AutoMapper;

using vega.Controllers.Resources;
using vega.Models;

namespace vega.Mapping
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      // Domain to API Resource
      CreateMap<Make, MakeResource>();
      CreateMap<Model, ModelResource>();
      CreateMap<Feature, FeatureResource>();
      CreateMap<Contact, ContactResource>();
      CreateMap<Vehicle, VehicleResource>()
        .ForMember(vr => vr.Features, opt => { 
            opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId));
        });

      // API Resource to Domain            
      CreateMap<ContactResource, Contact>();
      CreateMap<VehicleResource, Vehicle>()
        .ForMember(v => v.Features, opt => opt.Ignore())
        .ForMember(v => v.Id, opt => opt.Ignore())
        .AfterMap((vr, v) => {          
          // Remove unselected features
          var removeFeatures = v.Features
            .Where(f => !vr.Features.Contains(f.FeatureId));
          foreach (var f in removeFeatures)
            v.Features.Remove(f);
          
          // Add new features
          var addedFeatures = vr.Features
            .Where(id => !v.Features.Any(f => f.FeatureId == id))
            .Select(id => new VehicleFeature { FeatureId = id });          
          foreach (var f in addedFeatures)
            v.Features.Add(f);
        });
    }
  }
}