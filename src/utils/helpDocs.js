import AboutUs from "../pages/Help/docs/AboutUs";
import AvoidScams from "../pages/Help/docs/AvoidScams";
import OurMission from "../pages/Help/docs/OurMission";
import PaymentScams from "../pages/Help/docs/PaymentScams";
import PrecautionAndSafety from "../pages/Help/docs/PrecautionAndSafety";
import PrivacyPolicy from "../pages/Help/docs/PrivacyPolicy";
import TenancyAgreement from "../pages/Help/docs/TenancyAgreement";
import TermsOfService from "../pages/Help/docs/TermsOfService";

export const helpDocs = {
  ourMission: {
    id: "our-mission",
    label: "Our Mission",
    description: "Our mission and vision",
    content: OurMission,
  },
  aboutUs: {
    id: "about-us",
    label: "About Us",
    description: "About us and our platform",
    content: AboutUs,
  },
  privacyPolicy: {
    id: "privacy-policy",
    label: "Privacy Policy",
    description: "Our privacy policy and how we use your data",
    content: PrivacyPolicy,
  },
  termsOfUse: {
    id: "terms-of-use",
    label: "Terms of Use",
    description: "Our terms and conditions for using our platform",
    content: TermsOfService,
  },
  paymentScams: {
    id: "payment-scams",
    label: "Payment Scams",
    description: "How to avoid payment scams on our platform",
    content: PaymentScams,
  },
  safetyTips: {
    id: "safety-tips",
    label: "Precaution and Safety Tips",
    description: "Safety tips for using our platform safely",
    content: PrecautionAndSafety,
  },
  govtOfficialFormsAndWeb: {
    id: "govt-official-forms-and-web",
    label: "Govt. Official Forms and Web",
    description: "Agreements by province for using our platform safely",
    content: TenancyAgreement,
  },
  avoidScams: {
    id: "avoid-scams",
    label: "Avoid Scams",
    description: "How to avoid scams on our platform",
    content: AvoidScams,
  },
};
