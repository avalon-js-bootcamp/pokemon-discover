import Image from "next/image";

type PropsType = {
  name: string;
  message: string;
};

export function ChatBubble({ name, message }: PropsType) {
  return (
    <>
      <div className="nameplate">{name}</div>
      <div className="conversation">
        <div className="chatbox">{message}</div>
        <div className="portrait">
          <Image
            src={"/images/icons/profressor.jpg"}
            width={130}
            height={130}
            alt="Next.js Logo"
            priority
          />
        </div>
      </div>
    </>
  );
}
