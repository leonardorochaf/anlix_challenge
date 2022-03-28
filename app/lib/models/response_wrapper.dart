class ResponseWrapper<T> {
  Status status;
  T? data;
  String? message;

  ResponseWrapper.initial() : status = Status.initial;
  ResponseWrapper.loading() : status = Status.loading;
  ResponseWrapper.completed(this.data) : status = Status.completed;
  ResponseWrapper.error(this.message) : status = Status.error;

  @override
  String toString() {
    return "Status : $status";
  }
}

enum Status { initial, loading, completed, error }
