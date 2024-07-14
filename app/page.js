import Image from "next/image";
import Link from "next/link";
// import One from "./components/One";
import { useAppContext } from "./context/usercontext";

export default function Home() {

  // const {name}=useAppContext();
  return (
   <>
   {/* <h1>page come by next js--------{name}</h1> */}
   <Link href={{  pathname:'/About',query:{id:"vamshi"}}}>Home page</Link>
   {/* <One></One> */}
   </>
  );
}
