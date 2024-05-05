export default function Meet() {
  return (
    <div className="h-screen flex flex-col items-center justify-center m-1 bg-black">
      <div
        className="calendly-inline-widget min-w-[300px] md:min-w-[600px] md:w-full min-h-[700px] h-full"
        data-url="https://calendly.com/horaciocorteznoe?background_color=1a1a1a&text_color=ffffff"
      ></div>
      <script
        type="text/javascript"
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      ></script>
    </div>
  );
}
