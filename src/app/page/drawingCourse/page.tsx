import GoToHomeBtn from "@/components/common/goToHomeBtn";
import DrawingCourseView from "@/components/views/drawingCourseView";

export default function DrawingCoursePage() {
  return (
    <main data-testid="DrawingCoursePage">
      <DrawingCourseView />
      <GoToHomeBtn />
    </main>
  );
}
