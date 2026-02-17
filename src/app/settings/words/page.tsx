import Link from "next/link";
import { ArrowLeft, ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function WordsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8 md:py-12">
      <Card className="border-slate-200">
        <CardHeader>
          <CardTitle className="inline-flex items-center gap-2 text-2xl">
            <ListChecks className="h-5 w-5" />
            مدیریت واژه‌ها
          </CardTitle>
          <CardDescription>
            این بخش در گام بعدی تکمیل می‌شود. فعلاً از طریق دسته‌بندی‌ها می‌تونی
            به placeholder نمایش واژه‌ها دسترسی داشته باشی.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/settings/wordCategory">
            <Button variant="outline" className="border-slate-300">
              بازگشت به دسته‌بندی‌ها
              <ArrowLeft className="mr-1 h-4 w-4" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </main>
  );
}
