class ApiError extends Error{
    constructor(statusCode,message="Something Went Wrong",errors=[]){
        super();
        this.statusCode=statusCode;
        this.data=null;
        this.message=message
        this.success=false;
        this.errors=errors;
    }
}
export {ApiError}