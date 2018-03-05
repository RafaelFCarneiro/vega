using System.Collections.Generic;
using System.Linq;
using AutoMapper;

using vega.Controllers.Resources;
using vega.Core.Models;

namespace vega.Mapping
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      // Domain to API Resource
      CreateMap<Make, MakeResource>();
      CreateMap<Make, KeyValuePairResource>();
      CreateMap<Model, KeyValuePairResource>();
      CreateMap<Feature, KeyValuePairResource>();
      CreateMap<Contact, ContactResource>();
      CreateMap<Vehicle, SaveVehicleResource>()
        .ForMember(vr => vr.Features, opt => { 
            opt.MapFrom(v => v.Features.Select(vf => vf.FeatureId));
        });
      CreateMap<Vehicle, VehicleResource>()
        .ForMember(vr => vr.Features, opt => { 
            opt.MapFrom(v => v.Features.Select(vf => new KeyValuePairResource {
              Id = vf.Feature.Id,
              Name = vf.Feature.Name              
            }));
        })
        .ForMember(vr => vr.Make, opt => opt.MapFrom(v => v.Model.Make));

      // API Resource to Domain
      CreateMap<FilterResource, Filter>();            
      CreateMap<ContactResource, Contact>();
      CreateMap<SaveVehicleResource, Vehicle>()
        .ForMember(v => v.Features, opt => opt.Ignore())
        .ForMember(v => v.Id, opt => opt.Ignore())
        .AfterMap((vr, v) => {          
          // Remove unselected features
          var removeFeatures = v.Features
            .Where(f => !vr.Features.Contains(f.FeatureId))
            .ToList();          
          foreach (var f in removeFeatures)
            v.Features.Remove(f);
          
          // Add new features
          var addedFeatures = vr.Features
            .Where(id => !v.Features.Any(f => f.FeatureId == id))
            .Select(id => new VehicleFeature { FeatureId = id })
            .ToList();                    
          foreach (var f in addedFeatures)
            v.Features.Add(f);
        });
    }
  }
}