import { APP_NAME } from "../constants/app.constant";
import { ModeToggle } from "./mode-toggle";

export const Header = (): JSX.Element => {
  return (
    <section className="flex justify-between items-center">
      <div className="">
        <h1 className="text-2xl font-bold mr-2 uppercase">{APP_NAME}</h1>
      </div>

      <div className="">
        <ModeToggle />
      </div>
    </section>
  );
};
