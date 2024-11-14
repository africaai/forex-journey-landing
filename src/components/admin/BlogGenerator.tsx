import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export function BlogGenerator() {
  const [rawContent, setRawContent] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateBlogPost = async () => {
    if (!rawContent.trim()) {
      toast({
        title: "Error",
        description: "Please enter some content to generate a blog post",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_WEBHOOK_BASE_URL}/blog-generator`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('sessionToken')}`
        },
        body: JSON.stringify({
          rawContent,
          timestamp: new Date().toISOString(),
          authorId: localStorage.getItem('userId'),
        })
      });

      if (!response.ok) throw new Error('Failed to generate blog post');

      const data = await response.json();
      
      toast({
        title: "Success!",
        description: "Blog post has been generated and saved",
      });

      setRawContent("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate blog post. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold">Generate Blog Post</h1>
      <div className="space-y-4">
        <Textarea
          placeholder="Enter your raw content, ideas, or notes here..."
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          className="min-h-[200px] sm:min-h-[300px]"
        />
        <Button 
          onClick={generateBlogPost} 
          disabled={isGenerating || !rawContent.trim()}
          className="w-full"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Blog Post...
            </>
          ) : (
            "Generate Blog Post"
          )}
        </Button>
      </div>
    </div>
  );
}