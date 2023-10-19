import Link from "next/link";
import BalanceInfo from "../balanceInfo/page";

export default function navbar() {
  return (
    <div className="flex justify-around space-x-10 h-10 w-full items-center bg-white">
      <div className="">
        <BalanceInfo />
      </div>
      <Link href="/">
        <button className="rounded-lg font-bold text-xl text-easy-blue">easyPDF</button>
      </Link>
      <Link href="/">
        <button className="rounded-lg font-bold text-xl text-easy-blue">Erklärung & Preis</button>
      </Link>
      <Link href="/">
        <button className="rounded-lg font-bold text-xl text-easy-blue">About</button>
      </Link>
    </div>
  );
}
