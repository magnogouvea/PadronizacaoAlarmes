import Image from "next/image";
import ListAlarms from "./components/ListAlarm";

export default function Home() {
  return (
    <div>
      <main>
        <ListAlarms />
      </main>
    </div>
  );
}
