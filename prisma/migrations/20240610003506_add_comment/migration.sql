-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "zayavkaId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Comment_text_key" ON "Comment"("text");

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_zayavkaId_fkey" FOREIGN KEY ("zayavkaId") REFERENCES "Zayavka"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
