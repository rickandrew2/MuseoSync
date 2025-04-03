import React from "react";
import { ShieldCheck, Users, Info, Wifi } from "lucide-react";

export function Visit2() {
  return (
    <div className="space-y-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-foreground mb-4">
          Visitor Guidelines & Policies
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          To ensure an enjoyable experience for all visitors, please review our guidelines and policies before your visit.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        {/* Safety Guidelines */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Safety Guidelines</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Wear a face mask in designated areas</li>
                <li>• Maintain appropriate distance from exhibits</li>
                <li>• Follow staff instructions at all times</li>
                <li>• No flash photography in sensitive areas</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Group Visits</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Advance booking required for groups of 10+</li>
                <li>• Special rates for educational groups</li>
                <li>• Guided tours available upon request</li>
                <li>• Maximum group size: 25 people</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Museum Policies & Additional Info */}
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <Info className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Museum Policies</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• No food or drinks in exhibition areas</li>
                <li>• No large bags or backpacks</li>
                <li>• Photography permits required for commercial use</li>
                <li>• Children under 12 must be accompanied</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 rounded-lg bg-primary/5 text-primary">
              <Wifi className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-foreground mb-3">Additional Information</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Audio guides available in multiple languages</li>
                <li>• Free Wi-Fi throughout the museum</li>
                <li>• Wheelchair accessible facilities</li>
                <li>• Gift shop open during museum hours</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 