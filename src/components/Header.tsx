import { APP_NAME } from "../constants/app.constant";

export const Header = (): JSX.Element => {
  return (
    <section className="flex justify-between items-center bg-secondary">
      <div className="relative flex justify-center w-full">
        <div className="flex w-full justify-between px-8">
          <h1 className="text-6xl mr-2 uppercase text-white" style={{ fontFamily: "LondrinaSketch, sans-serif" }}>{APP_NAME}</h1>
          <div className="flex gap-2 items-center text-xl text-white">
            <h1>Home</h1>
            <h1>Plantação</h1>
          </div>
        </div>
        <img src="/img/icon-header.svg" className="absolute top-2 w-28" alt="" />
      </div>
    </section>
  );
};
