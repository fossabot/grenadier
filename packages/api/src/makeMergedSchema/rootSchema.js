import { gql } from "apollo-server-lambda";
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from "graphql-iso-date";

import apiPackageJson from "src/../package.json";

/**
 * This adds scalar types for dealing with Date, Time, and DateTime, and adds a root
 * `Query` type which is needed to start the GraphQL server on a fresh install.
 */
export const schema = gql`
	scalar Date
	scalar Time
	scalar DateTime

	type Grenadier {
		version: String
	}

	type Query {
		grenadier: Grenadier
	}
`;

export const resolvers = {
	Date: GraphQLDate,
	Time: GraphQLTime,
	DateTime: GraphQLDateTime,
	Query: {
		grenadier: () => ({
			version: apiPackageJson.version,
		}),
	},
};
