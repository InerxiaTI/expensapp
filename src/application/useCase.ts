

/**
 * #### Description
 * 
 * #### Version
 * since: v0.4.0-alpha
 * #### Example
 * 
 * #### Links
 * 
 * 
 * Use case
 * @template T request
 * @template U response
 */
export interface UseCase<T, U> {

    run(...data: any): Promise<U> 

}