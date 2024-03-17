-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_todoId_fkey";

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_todoId_fkey" FOREIGN KEY ("todoId") REFERENCES "Todo"("id") ON DELETE CASCADE ON UPDATE CASCADE;
