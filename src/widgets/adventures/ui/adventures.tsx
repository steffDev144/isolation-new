
import { RedButton } from "@/shared/ui/RedButton/RedButton";
import "./adventures.scss";
import { List } from "@/shared/ui/list";

export function Adventures() {
  return (
    <section className="adventures">
      <ul className="adventures__list">
        <List />
      </ul>
    </section>
  );
}
