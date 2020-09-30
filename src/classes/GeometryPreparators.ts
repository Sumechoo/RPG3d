import { Float32BufferAttribute, Vector3 } from "three";
import { Preparator } from "../types";

export const PreparePlaneGeomentry: Preparator = () => {
    const width = 1;
    const height = 1;

    const width_half = width / 2;
    const height_half = height / 2;

    const gridX = Math.floor( 1 );
    const gridY = Math.floor( 1 );

    const gridX1 = gridX + 1;
    const gridY1 = gridY + 1;

    const segment_width = width / gridX;
    const segment_height = height / gridY;

    // buffers

    const indices = [];
    const vertices = [];
    const normals = [];
    const uvs = [];

    // generate vertices, normals and uvs

    for ( let iy = 0; iy < gridY1; iy ++ ) {

        const y = iy * segment_height - height_half;

        for ( let ix = 0; ix < gridX1; ix ++ ) {

            const x = ix * segment_width - width_half;

            vertices.push( x, - y, 0);
            normals.push( 0, 0, 1 );
            uvs.push( ix / gridX );
            uvs.push( 1 - ( iy / gridY ));

        }

    }

    // indices

    for ( let iy = 0; iy < gridY; iy ++ ) {

        for ( let ix = 0; ix < gridX; ix ++ ) {

            const a = ix + gridX1 * iy;
            const b = ix + gridX1 * ( iy + 1 );
            const c = ( ix + 1 ) + gridX1 * ( iy + 1 );
            const d = ( ix + 1 ) + gridX1 * iy;

            // faces

            indices.push( a, b, d );
            indices.push( b, c, d );
        }
    }

    return {
        indices,
        normals,
        vertices,
        uvs,
    }
}

export const PrepareBoxGeometry: Preparator = () => {

    const width = 1;
    const depth = 1;
    const height = 1;
    const widthSegments = 1;
    const heightSegments = 1;
    const depthSegments = 1;

    const indices: number[] = [];
    const vertices: number[] = [];
    const normals: number[] = [];
    const uvs: number[] = [];

    // helper variables

    let numberOfVertices = 0;
    let groupStart = 0;

    // build each side of the box geometry

    buildPlane( 'z', 'y', 'x', - 1, - 1, depth, height, width, depthSegments, heightSegments); // px
    buildPlane( 'z', 'y', 'x', 1, - 1, depth, height, - width, depthSegments, heightSegments); // nx
    buildPlane( 'x', 'z', 'y', 1, 1, width, depth, height, widthSegments, depthSegments); // py
    buildPlane( 'x', 'z', 'y', 1, - 1, width, depth, - height, widthSegments, depthSegments); // ny
    buildPlane( 'x', 'y', 'z', 1, - 1, width, height, depth, widthSegments, heightSegments); // pz
    buildPlane( 'x', 'y', 'z', - 1, - 1, width, height, - depth, widthSegments, heightSegments ); // nz

    function buildPlane( u: any, v: any, w: any, udir: number, vdir: number, width: number, height: number, depth: number, gridX: number, gridY: number ) {

        const segmentWidth = width / gridX;
        const segmentHeight = height / gridY;

        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const depthHalf = depth / 2;

        const gridX1 = gridX + 1;
        const gridY1 = gridY + 1;

        let vertexCounter = 0;
        let groupCount = 0;

        const vector: any = new Vector3();

        // generate vertices, normals and uvs

        for ( let iy = 0; iy < gridY1; iy ++ ) {

            const y = iy * segmentHeight - heightHalf;

            for ( let ix = 0; ix < gridX1; ix ++ ) {

                const x = ix * segmentWidth - widthHalf;

                // set values to correct vector component

                vector[ u ] = x * udir;
                vector[ v ] = y * vdir;
                vector[ w ] = depthHalf;

                // now apply vector to vertex buffer

                vertices.push( vector.x, vector.y, vector.z );

                // set values to correct vector component

                vector[ u ] = 0;
                vector[ v ] = 0;
                vector[ w ] = depth > 0 ? 1 : - 1;

                // now apply vector to normal buffer

                normals.push( vector.x, vector.y, vector.z );

                // uvs

                uvs.push( ix / gridX );
                uvs.push( 1 - ( iy / gridY ) );

                // counters

                vertexCounter += 1;

            }

        }

        // indices

        // 1. you need three indices to draw a single face
        // 2. a single segment consists of two faces
        // 3. so we need to generate six (2*3) indices per segment

        for ( let iy = 0; iy < gridY; iy ++ ) {

            for ( let ix = 0; ix < gridX; ix ++ ) {

                const a = numberOfVertices + ix + gridX1 * iy;
                const b = numberOfVertices + ix + gridX1 * ( iy + 1 );
                const c = numberOfVertices + ( ix + 1 ) + gridX1 * ( iy + 1 );
                const d = numberOfVertices + ( ix + 1 ) + gridX1 * iy;

                // faces

                indices.push( a, b, d );
                indices.push( b, c, d );

                // increase counter

                groupCount += 6;

            }

        }

        // calculate new start value for groups

        groupStart += groupCount;

        // update total number of vertices

        numberOfVertices += vertexCounter;

    }
        
    return {
        indices,
        normals,
        vertices,
        uvs,
    }
}