import AdminGate from "@/components/AdminGate";
import SiteEditor from "@/components/SiteEditor";
export default function EditPage({ params }) { return <AdminGate><SiteEditor id={params.id} /></AdminGate>; }
