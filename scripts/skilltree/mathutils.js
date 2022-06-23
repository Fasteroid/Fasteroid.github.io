class MathUtils {
    static distance2(x1,y1,x2,y2){
        return (x1-x2)**2 + (y1-y2)**2;
    }
    
    static distance(x1,y1,x2,y2){
        return Math.sqrt( (x1-x2)**2 + (y1-y2)**2 );
    }

    static length(x1,y1){
        return Math.sqrt( (x1)**2 + (y1)**2 );
    }
    
    static clamp(n,min,max){
        return (n > max ? max : (n < min ? min : n));
    }

    static dot(x1,x2,y1,y2){
        return x1*x2 + y1*y2
    }
}

export { MathUtils as default };