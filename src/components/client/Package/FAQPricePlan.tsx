import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    id: "1",
    question: "প্রতিটি প্ল্যানের মধ্যে কী কী আছে?",
    answer:
      "প্রতিটি প্ল্যানের মধ্যে কুইজে অংশগ্রহন করা, ড্যাশবোর্ড, এ্যানালিটিক্স, সুন্দর ইউজার ইন্টারফেস এবং বিস্তারিত রিপোর্ট অন্তর্ভুক্ত রয়েছে।",
  },
  {
    id: "2",
    question: "ফ্রী প্ল্যানে কি কি আছে?",
    answer:
      "ফ্রী প্ল্যানে, আনলিমিটেড ব্লগ পড়তে পারবেন এবং যে কোনো ৫টি কুইজে অংশগ্রহন করতে পারবেন।",
  },
  {
    id: "3",
    question: "আমি কি পরবর্তীতে আমার প্ল্যান আপগ্রেড বা ডাউনগ্রেড করতে পারবো?",
    answer:
      "হ্যাঁ, আপনি যেকোনো সময় আপনার প্ল্যান পরিবর্তন করতে পারবেন। আপগ্রেড করলে সাথে সাথে আমাদের অতিরিক্ত ফিচার ব্যবহার করতে পারবেন, আর ডাউনগ্রেডের ক্ষেত্রে বিলিং সাইকেল শেষে পরিবর্তন কার্যকর করা হবে।",
  },
  {
    id: "4",
    question: "আপনারা কী ধরনের পেমেন্ট মেথড গ্রহণ করেন?",
    answer: "সাধারণত এখন আমরা ম্যানুয়াল বিকাশ পেমেন্ট মেথড গ্রহণ করি।",
  },
  {
    id: "5",
    question: "আমার ডেটা কি নিরাপদ?",
    answer:
      "হ্যাঁ, আমরা আপনার ডেটার নিরাপত্তা নিশ্চিত করতে এন্ড-টু-এন্ড এনক্রিপশন এবং নিয়মিত সিকিউরিটি আপডেট প্রদান করি।",
  },
  {
    id: "6",
    question: "আমি কি গ্রাহক সহায়তা পাব?",
    answer:
      "শুধুমাত্র প্রিমিয়াম প্ল্যানের গ্রাহকদের জন্য ইমেইল এবং প্রয়োজন অনুযায়ী লাইভ সাপোর্ট প্রদান করি।",
  },
  {
    id: "7",
    question: "যদি আমি আমার সাবস্ক্রিপশন বাতিল করি তাহলে কী হবে?",
    answer:
      "সাবস্ক্রিপশন বাতিল করলে আপনার অ্যাকাউন্ট ফ্রি প্ল্যানে ডাউনগ্রেড হবে এবং প্রিমিয়াম ফিচার আর ব্যবহার করতে পারবেন না।",
  },
  {
    id: "8",
    question: "যদি আমি সন্তুষ্ট না হই, তাহলে কি রিফান্ড পাওয়া যাবে?",
    answer:
      "হ্যাঁ, আমাদের সকল পেইড প্ল্যানের জন্য ৭ দিনের মানি ব্যাক গ্যারান্টি আছে।",
  },
  {
    id: "9",
    question: "কোনো হিডেন ফি আছে কি?",
    answer:
      " না, কোনো হিডেন ফি নেই। আপনি যেটা দেখছেন সেটাই আপনার পেমেন্ট করতে হবে।",
  },
];

const FAQPricePlan = () => {
  return (
    <div className=" py-20">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-5xl font-semibold bg-gradient-to-b from-white to-transparent bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
        </div>
        <div className=" max-w-5xl mx-auto mt-16">
          {faqData.map((faq) => (
            <div key={faq.id}>
              <Accordion type="single" collapsible>
                <AccordionItem value={faq.id}>
                  <AccordionTrigger>
                    <h1 className="text-lg font-medium hover:text-TextPrimary">
                      {faq.question}
                    </h1>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-lg font-extralight">{faq.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>
    </div>
  );
};

export default FAQPricePlan;
