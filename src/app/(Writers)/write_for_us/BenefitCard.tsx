"use client";

import { CheckCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BenefitCardProps {
  title: string;
  features: string[];
}

const BenefitCard = ({ title, features }: BenefitCardProps) => {
  return (
    <Card className="flex w-[22rem] flex-col ring ring-primary">
      <CardHeader className="flex space-y-4">
        <CardTitle className="flex">{title}</CardTitle>
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
