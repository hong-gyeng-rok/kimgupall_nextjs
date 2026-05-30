type ArticleProps = {
  title: string;
  comment: string;
  imageUrl: string;
  alt: string;
};

export default function Article({
  title,
  comment,
  imageUrl,
  alt,
}: ArticleProps) {
  return (
    <div className="grid h-fit grid-cols-3 gap-5 px-30">
      <div className="flex h-fit flex-col items-start justify-start text-white">
        <h1 className="font-bold text-9xl">{title}</h1>
        <p className="w-[50%] text-3xl">{comment}</p>
      </div>

      <div className="flex h-fit w-full items-center justify-center">
        <div className="relative inset-0 items-center justify-center sm:flex">
          <div className="static inset-0 flex items-center-safe justify-center">
            <div>
              <div className="overflow-hidden rounded-2xl bg-black/10 shadow-xl">
                <img
                  src={imageUrl}
                  alt={alt}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="h-1.5 w-auto overflow-hidden rounded-full bg-white/20">
                <div className="h-full bg-white shadow-[0_0_8px_rgba(0,0,0,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start justify-end text-white">
        <h1 className="font-bold text-9xl">{title}</h1>
        <p className="w-[50%] text-3xl">{comment}</p>
      </div>
    </div>
  );
}
