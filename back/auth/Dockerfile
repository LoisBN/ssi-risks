FROM golang:1.14

WORKDIR /go/src/app
COPY . .

RUN go get github.com/gorilla/mux
RUN go get gopkg.in/mgo.v2
RUN go get go.mongodb.org/mongo-driver/bson
RUN go get golang.org/x/crypto/bcrypt
RUN go get github.com/google/uuid
RUN go get github.com/go-redis/redis
RUN go install -v ./...
RUN go build

EXPOSE 8100

CMD ["app"]