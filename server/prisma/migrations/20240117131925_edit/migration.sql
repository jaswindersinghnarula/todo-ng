-- AlterTable
ALTER TABLE "Item" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'PENDING';
