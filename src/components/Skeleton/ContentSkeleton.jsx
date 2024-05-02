import { Skeleton } from '@/utils/primeComponents';

const ContentSkeleton = () => {
  return (
    <>
      <div className="flex justify-content-between mb-4 gap-4">
        <Skeleton width="100%" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
      </div>
      <div className="flex justify-content-between mb-4 gap-4">
        <Skeleton width="100%" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
      </div>
      <div className="flex justify-content-between mb-4 gap-4">
        <Skeleton width="100%" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
        <Skeleton width="3rem" height="2.5rem"></Skeleton>
      </div>
    </>
  );
};

export default ContentSkeleton;
