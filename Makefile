generatedb:
	bunx prisma generate
pushdb:
	bunx prisma db push
resetdb:
	bunx prisma migrate reset
studio:
	bunx prisma studio

PHONY: generatedb pushdb resetdb studio