import { useState } from "react";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { Button } from "./Button";

dayjs.extend(calendar);

const ERR_TOO_MANY_REQUESTS = "too-many-request";
const ERR_UNKNOWN = "unknown";

type GeneratedEmail = {
  address: string;
  expireAt: Date | string;
}

const generateContactEmail = async (): Promise<GeneratedEmail> => {
  const storedEmailKey = "generated-contact-email";
  const storedEmail = JSON.parse(localStorage.getItem(storedEmailKey) || "null") as GeneratedEmail | null;
  if (storedEmail && (dayjs(storedEmail.expireAt).isAfter(dayjs().subtract(1, "hour")))) {
    return storedEmail;
  }

  const res = await fetch("https://email-route-generator.lyn.workers.dev/generate", { method: "POST" });
  if (res.status === 429) {
    throw new Error(ERR_TOO_MANY_REQUESTS);
  } else if (res.status >= 300) {
    throw new Error(ERR_UNKNOWN);
  }

  const body = await res.json() as { address: string, expireAt: number };
  const generatedEmail = {
    address: body.address,
    expireAt: new Date(body.expireAt),
  };
  localStorage.setItem(storedEmailKey, JSON.stringify(generatedEmail));

  return generatedEmail;
};

function CopyButton({ address }: { address: string }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(address).then(() => { setCopied(true); });
      }}
    >
      {copied ? t("home/contact/button/copied") : t("home/contact/button/copy")}
    </Button>
  );
}

export function ContactEmailGenerator() {
  const { t } = useTranslation();
  const [address, setAddress] = useState<string>();
  const [message, setMessage] = useState<string>();

  return (
    <div>
      {address ?
        <p>
          <span className="mr-2">{address}</span><CopyButton address={address} />
        </p> :
        <Button onClick={async (e) => {
          e.preventDefault();
          generateContactEmail()
            .then((generated) => {
              const diffHours = dayjs(generated.expireAt).diff(dayjs(), "hours");
              setAddress(generated.address);
              setMessage(t("home/contact/mail-address-valid-until", { hours: diffHours })!);
            })
            .catch((e) => { setMessage(t(`home/contact/error/${e.message}`)!); });
        }}>
          {t("home/contact/show-mail-address")}
        </Button>
      }

      {message && <p className="py-4 text-base">{message}</p>}
    </div>
  );
}
