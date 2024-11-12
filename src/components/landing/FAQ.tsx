import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How long does it take to complete the course?",
    answer:
      "The course is self-paced and can be completed in 8-12 weeks. However, you'll have lifetime access to all materials to review at your convenience.",
  },
  {
    question: "Do I need trading experience to join?",
    answer:
      "No prior experience is required. Our program is designed to take you from complete beginner to proficient trader through structured learning paths.",
  },
  {
    question: "What support will I receive?",
    answer:
      "You'll get access to our community forum, weekly live Q&A sessions with Dennis, and dedicated support staff to help with technical issues.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes, we offer a 30-day satisfaction guarantee. If you're not completely satisfied, we'll refund your investment - no questions asked.",
  },
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-gray-600">
            Find answers to commonly asked questions about our program
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;