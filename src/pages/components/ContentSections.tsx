import { FormState } from "./SharedUI";
import ServicesSections from "./ServicesSections";
import ReviewsContactSection from "./ReviewsContactSection";
import MapFooter from "./MapFooter";

interface ContentSectionsProps {
  form: FormState;
  setForm: (v: FormState) => void;
  sent: boolean;
  setSent: (v: boolean) => void;
  go: (id: string) => void;
}

export default function ContentSections({ form, setForm, sent, setSent, go }: ContentSectionsProps) {
  return (
    <>
      <ServicesSections />
      <ReviewsContactSection form={form} setForm={setForm} sent={sent} setSent={setSent} go={go} />
      <MapFooter go={go} />
    </>
  );
}
