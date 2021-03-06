// This is Grenadier's routing mechanism. It takes inspiration from both Ruby on
// Rails' routing approach and from both React Router and Reach Router (the
// latter of which has closely inspired some of this code).

export {
	Router,
	Route,
	Link,
	NavLink,
	routes,
	useParams,
	navigate,
	PageLoadingContext,
} from "./internal";

export { usePageLoadingContext } from "./page-loader";
