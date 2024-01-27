import { IconName } from '@/shared/ui/Icon/Icons.types';

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  tokens: number;
  planType: string;
  actions: IconName[];
};

export type UserData = {
  id: string;
  email: string;
  name: string;
  role: string;
  subscription: {
    tokens: number;
    plan: {
      type: string;
    };
  };
};
