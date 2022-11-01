import { gql } from '@apollo/client';

export const USER_FRAGMENT = gql`
	fragment UserFragment on User {
		id
		createdAt
		updatedAt
		fullName
		username
		email
		isValid
		isSuperuser
		confirm
		emailToken
		# posts: [Post!] use post fragment
		# company: [Company!] use company fragment
		isAdmin
	}
`;

export const CURRENT_USER_QUERY = gql`
	query me {
		id
		fullName
		email
		isValid
		isSuperuser
		confirm
		isAdmin
	}
`;

export const GET_USER = gql`
	query getUser($id: String!) {
		getUser(userId: $id) {
			fullName
			company {
				id
				legalName
			}
		}
	}
`;

export const GET_USERS = gql`
	query listUsers(
		$before: String
		$after: String
		$first: Float
		$last: Float
		$order: OrderListUsers
		$filter: FilterListUsers
	) {
		listUsers(
			before: $before
			after: $after
			first: $first
			last: $last
			order: $order
			filter: $filter
		) {
			edges {
				cursor
				node {
					...UserFragment
				}
			}
			pageInfo {
				startCursor
				endCursor
				hasNextPage
				hasPreviousPage
			}
			totalCount
		}
	}
	${USER_FRAGMENT}
`;
