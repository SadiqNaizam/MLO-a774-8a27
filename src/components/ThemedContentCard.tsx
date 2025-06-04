import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Heart } from 'lucide-react'; // Example icons

interface ThemedContentCardProps {
  id: string | number;
  title: string;
  description?: string; // e.g., Artist Name or Playlist type
  imageUrl: string;
  type: 'album' | 'playlist' | 'artist'; // To vary styling or actions
  onPlayClick?: (id: string | number) => void;
  onLikeClick?: (id: string | number) => void;
  navigateTo?: string; // For react-router Link, if card itself is clickable
}

const ThemedContentCard: React.FC<ThemedContentCardProps> = ({
  id,
  title,
  description,
  imageUrl,
  type,
  onPlayClick,
  onLikeClick,
  navigateTo,
}) => {
  console.log(`Rendering ThemedContentCard: ${title} (Type: ${type})`);

  const handlePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation if card is a link
    console.log(`Play clicked on card: ${id}`);
    onPlayClick?.(id);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log(`Like clicked on card: ${id}`);
    onLikeClick?.(id);
  };

  const cardContent = (
    <Card className="w-full h-full group overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl bg-card/80 hover:bg-card">
      {/* Doraemon theme: consider border-blue-500 or shadow-blue-300/50 on hover */}
      <CardHeader className="p-0 relative">
        <AspectRatio ratio={1 / 1}>
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </AspectRatio>
        {onPlayClick && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
            // Doraemon theme: Play button could be red or yellow
            onClick={handlePlay}
            aria-label={`Play ${title}`}
          >
            <PlayCircle size={24} />
          </Button>
        )}
      </CardHeader>
      <CardContent className="p-3 space-y-1">
        <CardTitle className="text-base font-semibold truncate text-card-foreground">{title}</CardTitle>
        {description && <CardDescription className="text-xs truncate text-muted-foreground">{description}</CardDescription>}
      </CardContent>
      {onLikeClick && (
        <CardFooter className="p-2 pt-0">
            <Button variant="ghost" size="sm" onClick={handleLike} className="text-muted-foreground hover:text-pink-500">
                <Heart size={16} className="mr-1" /> Like
            </Button>
        </CardFooter>
      )}
    </Card>
  );

  if (navigateTo) {
    // If using React Router, import Link and wrap `cardContent`
    // import { Link } from 'react-router-dom';
    // return <Link to={navigateTo} className="block">{cardContent}</Link>;
    console.warn("ThemedContentCard: navigateTo prop requires react-router-dom Link wrapping. This is a placeholder.");
    return <div onClick={() => console.log(`Navigate to: ${navigateTo}`)} className="cursor-pointer">{cardContent}</div>;
  }

  return cardContent;
};

export default ThemedContentCard;