"use client";

import { CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitCardProps {
  title: string;
  features: string[];
  icon: React.ReactNode;
}

const BenefitCard = ({ title, features, icon }: BenefitCardProps) => {
  return (
    <Card className="flex w-[22rem] flex-col ring ring-primary">
      <CardHeader className="space-y-4">
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <div>{icon}</div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col space-y-4">
        {features.map((feature) => (
          <div key={feature} className="flex space-x-4">
            <CheckCircle className="flex-none text-lime-400" />
            <div>{feature}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
export default BenefitCard;
