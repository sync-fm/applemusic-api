import type {
	Relationship,
	RelationshipRef,
	Resource,
} from "../SharedResourceTypes";

export interface RelationshipWithRefs<
	T extends RelationshipRef = RelationshipRef,
> extends Relationship {
	data?: T[];
}

export interface RelationshipWithResources<T extends Resource = Resource> {
	href?: string;
	data?: T[];
	meta?: Record<string, unknown>;
	next?: string;
}
