export type ObstacleType = 'once' | 'reusable' | 'event' | 'stream';

export interface Obstacle {
  id: string;
  name: string;
  description: string | null;
  type: ObstacleType;
}
