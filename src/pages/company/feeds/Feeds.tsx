import { CompanyRecommendation } from '@/shared-components/company-recommendation';
import { LoaderDataComponent } from '@/shared-components/loader-data-component';
import { InfiniteScroller } from '@/shared-components/infinite-scroller';
import { TrendingTopics } from '@/shared-components/trending-topics';
import { useCompanyFeedsQuery } from '@/hooks/services/useCompanyFeedsQuery';
import { PostEdge } from '@/generated/graphql';
import CreatePost from './form/CreatePost';
import Feed from '../feeds/Feed';

const Feeds = ({ companySlug = '' }: { companySlug: string }) => {
	const { feeds, loading, hasNextPage, onLoadMore } = useCompanyFeedsQuery(companySlug);
	return (
		<>
			<div className='gap-4 grid md:grid-cols-3'>
				<div className='col-span-2'>
					<div className='flex flex-col'>
						<CreatePost />
						<LoaderDataComponent isLoading={loading} data={feeds}>
							<InfiniteScroller
								loading={loading}
								scrollableTop={true}
								hasNextPage={hasNextPage}
								onLoadMore={onLoadMore}>
								{(feeds || []).map((postNode: PostEdge) => {
									const { node } = postNode;
									return (
										<Feed
											key={node?.id}
											name={node?.creator?.company ? node?.creator?.company[0].legalName : ''}
											post={node}
											isOnSale={false}
										/>
									);
								})}
							</InfiniteScroller>
						</LoaderDataComponent>

						{/* <BrandMenus /> */}
						{/* Use this iteration concept inside Feed component and in that iteration call CompanyFeed component on each loop */}
					</div>
				</div>
				<div className='widgets'>
					<div className='flex flex-col h-full sticky top-24 w-full'>
						<TrendingTopics />
						{/* TODO: if a user is viewing a company profile then show CompanyRecommendation else different things */}
						<CompanyRecommendation />
					</div>
				</div>
			</div>
		</>
	);
};

export default Feeds;
