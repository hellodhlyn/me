import { useState } from "react";
import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
import { ClipboardCopyIcon, CheckIcon } from "@heroicons/react/outline";
import { Button } from "./Button";

dayjs.extend(calendar);

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
    throw new Error("이메일 주소 발급 요청이 너무 많아 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
  } else if (res.status >= 300) {
    throw new Error("이메일 주소 발급에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }

  const body = await res.json() as { address: string, expireAt: number };
  const generatedEmail = {
    address: body.address,
    expireAt: new Date(body.expireAt),
  };
  localStorage.setItem(storedEmailKey, JSON.stringify(generatedEmail));

  return generatedEmail;
};

function copyAddress(address: string) {
}

function CopyButton({ address }: { address: string }) {
  const [copied, setCopied] = useState<boolean>(false);
  return (
    <Button
      onClick={(e) => {
        e.preventDefault();
        copyAddress(address);
        navigator.clipboard.writeText(address).then(() => { setCopied(true); });
      }}
    >
      {copied ?
        (<><CheckIcon className="h-4 w-4 inline" /> 복사됨</>) :
        (<><ClipboardCopyIcon className="h-4 w-4 inline"/> 복사</>)
      }
    </Button>
  );
}

export function ContactEmailGenerator() {
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
              setMessage(`위 이메일 주소는 ${diffHours}시간 동안 유효합니다.`);
            })
            .catch((e) => { setMessage(e.message); });
        }}>
          이메일 주소 확인
        </Button>
      }

      {message && <p className="py-4 text-base">{message}</p>}
    </div>
  );
}
