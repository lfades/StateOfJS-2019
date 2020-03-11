import entities from '../../data/entities.yml'
import features from '../../data/features.yml'
import resources from '../../data/resources.yaml'

export default function getEntitiesData() {
    return {
        entities: entities.map(entity => ({
            id: entity.id,
            name: entity.name,
            homepage: entity.homepage,
            aliases: entity.aliases
        })),
        features: features.map(feature => ({
            id: feature.id,
            name: feature.name,
            aliases: feature.aliases
        })),
        resources: resources.map(resource => ({
            id: resource.id,
            name: resource.name,
            homepage: resource.homepage,
            aliases: resource.aliases
        }))
    }
}