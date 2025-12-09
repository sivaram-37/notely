import AllNotes from "@/components/all-notes";
import { AnimatedPage } from "@/components/common/animated-page";
import CardWrapper from "@/components/common/cardWrapper";

const Page = () => {
  return (
    <AnimatedPage>
      <CardWrapper outerClassName="mt-3 bg-gray-100">
        <div className="mt-3 w-full flex gap-3">
          <AllNotes />
        </div>
      </CardWrapper>
    </AnimatedPage>
  );
};

export default Page;
