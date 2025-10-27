import { StarIcon } from "lucide-react";
import Image from "next/image";

const { Card, CardContent } = require("./ui/card");

const AnimeCard = ({ title, rating, status, image }) => {
  return (
    <>
      <Card className="p-0 overflow-hidden max-w-[200px]">
        <CardContent className="p-0">
          {image && (
            <Image
              src={image}
              alt="Anime image"
              width={200}
              height={280}
              className="object-cover w-full h-auto"
            />
          )}
          <div className="p-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <div className="mt-2 flex items-center justify-between">
              <div className="flex items-center gap-1">
                <StarIcon size={14} />
                <span className="text-sm text-muted-foreground">{rating}</span>
              </div>
              <div className="px-2 py-0.5 bg-green-300 rounded-full text-green-800 text-xs">
                {status}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
export default AnimeCard;
