FROM alpine:latest
ADD server/server /
COPY client/ /public
RUN chmod +x /server
EXPOSE 8000
CMD ["./server"]