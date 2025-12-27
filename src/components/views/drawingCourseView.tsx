import DrawingCourseLayout from "../layout/drawingCourseLayout";
import MainBg from "../layout/mainBg";

export default function DrawingCourseView() {
  return (
    <section data-testid="DrawingCourseView">
      <MainBg>
        <DrawingCourseLayout />
      </MainBg>
    </section>
  );
}
