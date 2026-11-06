import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactBar from "@/components/ContactBar";
import { WaProvider } from "@/components/Whatsapp";
export default function PublicLayout({ children }) {
  return (<WaProvider><Header />{children}<Footer /><ContactBar /></WaProvider>);
}