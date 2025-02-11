import { NextResponse } from "next/server";

const MOCK_RESPONSES: Record<string, string> = {
  AR_ENGAGEMENT: `Here's a detailed AR learning experience plan:

1. Learning Objectives:
- Understand basic geometric shapes in 3D space
- Learn spatial relationships
- Practice measurement concepts

2. AR Interaction Points:
- Shape recognition using camera
- Virtual object placement
- Interactive measurements
- 3D object manipulation

3. User Engagement Elements:
- Progressive difficulty levels
- Achievement badges
- Real-time feedback
- Collaborative challenges

4. Success Metrics:
- Completion rate of exercises
- Time spent in AR environment
- Accuracy of measurements
- User engagement scores`,

  IMPLEMENTATION_PLAN: `Technical Implementation Breakdown:

1. Required Technologies:
- ARKit/ARCore
- Unity/Three.js
- WebXR API
- Cloud Backend

2. Implementation Phases:
- Setup AR environment
- Implement object tracking
- Add user interactions
- Deploy and test

3. Technical Requirements:
- Modern smartphone/tablet
- Camera access
- Motion sensors
- Internet connectivity

4. Testing Approach:
- Unit testing AR functions
- Integration testing
- User acceptance testing
- Performance benchmarking`,

  CODE_GENERATION: `Sample AR Implementation Code:

1. AR Scene Setup:
\`\`\`javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();

// AR setup
const arSystem = new ARSystem();
await arSystem.initialize();
\`\`\`

2. Object Tracking:
\`\`\`javascript
function trackObject(object) {
  const pose = arSystem.getPose(object);
  object.position.copy(pose.position);
  object.quaternion.copy(pose.orientation);
}
\`\`\`

3. User Interactions:
\`\`\`javascript
function handleInteraction(event) {
  const intersection = getRaycastIntersection(event);
  if (intersection) {
    manipulateObject(intersection.object);
  }
}
\`\`\``,

  QA: `Q&A Session for AR Experience:

1. Common Questions:
Q: How do I calibrate the AR view?
A: Point your camera at a flat surface and follow the on-screen instructions.

Q: Why isn't object tracking working?
A: Ensure good lighting and a clear view of the tracking markers.

2. Technical Explanations:
- AR uses computer vision to track real-world objects
- 3D objects are rendered using WebGL
- Pose estimation determines object placement

3. Troubleshooting:
- Check camera permissions
- Ensure sufficient lighting
- Verify device compatibility
- Clear app cache if needed

4. Best Practices:
- Regular calibration checks
- Maintain stable camera position
- Use recommended lighting conditions
- Follow performance guidelines`,
};

export async function POST(req: Request) {
  try {
    const { message, type, step } = await req.json();

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // If it's a game-related query
    if (type === "GAME") {
      return NextResponse.json({
        content:
          MOCK_RESPONSES[step] || "No mock response available for this step",
        step,
      });
    }

    // For regular chat
    return NextResponse.json({
      content: `Mock response to: ${message}. This is a development placeholder response.`,
    });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to process request",
      },
      { status: 500 }
    );
  }
}
