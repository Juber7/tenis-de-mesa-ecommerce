import { PaddleLoader } from "@/components/ui/paddle-loader";

/**
 * Full-screen loader: the ball bouncing on the paddle, as a comic panel.
 * It fades in with CSS and is removed at once when the page is ready, so it
 * can never be left covering the screen by an unfinished exit animation.
 */
export function LoaderScreen({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="comic-loader-screen">
      <PaddleLoader />
    </div>
  );
}
