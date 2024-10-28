"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const API_URL = "https://api-inference.huggingface.co/models/facebook/detr-resnet-50";
const API_TOKEN = "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";

export default function ObjectDetection() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file));
      setError(null);
    }
  };

  const detectObjects = async () => {
    if (!selectedImage) return;

    try {
      setIsProcessing(true);
      setError(null);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result as string;
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: base64data.split(',')[1] }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`API request failed: ${response.status} ${response.statusText}\n${errorText}`);
        }

        const result = await response.json();
        setDetectionResults(result);
      };
      reader.readAsDataURL(selectedImage);
    } catch (error) {
      console.error('Error detecting objects:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setIsProcessing(false);
    }
  };


  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Object Detection</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">Upload Image</Label>
            <Input id="image" type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          {imagePreview && (
            <div className="relative aspect-video w-full">
              <Image
                src={imagePreview}
                alt="Uploaded image"
                fill
                className="object-contain rounded-lg"
              />
            </div>
          )}
          {error && (
            <div className="text-red-500 mt-4">
              <p>Error: {error}</p>
            </div>
          )}
          {detectionResults.length > 0 && (
            <div className="mt-4">
              <h2 className="text-xl font-bold mb-2">Detection Results:</h2>
              <ul>
                {detectionResults.map((result, index) => (
                  <li key={index}>
                    {result.label}: {(result.score * 100).toFixed(2)}% confidence
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={detectObjects} disabled={!selectedImage || isProcessing}>
          {isProcessing ? 'Processing...' : 'Detect Objects'}
        </Button>
      </CardFooter>
    </Card>

      );
}
