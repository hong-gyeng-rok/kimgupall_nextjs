import GoToHomeBtn from "@/components/common/goToHomeBtn";
import DrawingCourseView from "@/components/views/drawingCourseView";
import MainBg from "@/components/layout/mainBg";

export default function DrawingCoursePage() {
  return (
    <main data-testid="DrawingCoursePage">
      <MainBg>
        <GoToHomeBtn />
        <DrawingCourseView />
      </MainBg>
    </main>
  );
}
