import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn_ui/components/ui/card";

export default function CardBox({
  title,
  description,
  value,
  change,
  src,
  background,
}: {
  title: string;
  description: string;
  value: string;
  change: string;
  src: string;
  background?: string;
}) {
  return (
    <Card size="sm" className="relative mx-auto w-full max-w-sm bg-white px-4!">
      <CardContent className="py-3!">
        <div
          className={`absolute top-5 right-5 w-[40px] h-[40px] rounded-[8px]  flex items-center justify-center ${background}`}
        >
          <img src={src} className="w-[15px] h-[15px] text-white" alt={title} />
        </div>
        <div className="flex flex-col items-start">
          <p className="text-[14px] font-semibold text-[#7C808D]">{title}</p>
          <h2 className="text-[32px] font-bold">{value}</h2>
        </div>
        <p className="text-[12px] text-[#7C808D]">
          <span className="text-green-500 font-bold text-[14px] me-1">{change}</span> {description}
        </p>
      </CardContent>
    </Card>
  );
}
